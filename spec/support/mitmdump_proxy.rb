# frozen_string_literal: true

class MitmdumpProxy
  @pid = nil

  def self.start(cassette_name)
    if File.exist?("spec/fixtures/mitmproxy_flows/#{cassette_name}.flows")
      start_replay_proxy(cassette_name)
    else
      start_record_proxy(cassette_name)
    end
  end

  def self.start_replay_proxy(cassette_name)
    @pid = spawn("mitmdump --server-replay spec/fixtures/mitmproxy_flows/#{cassette_name}.flows --set connection_strategy=lazy")
    Process.detach(@pid)
  end

  def self.start_record_proxy(cassette_name)
    @pid = spawn("mitmdump --save-stream-file spec/fixtures/mitmproxy_flows/#{cassette_name}.flows")
    Process.detach(@pid)
  end

  def self.stop
    return unless @pid

    Process.kill("TERM", @pid)
    Process.wait(@pid)
    @pid = nil
  end
end
